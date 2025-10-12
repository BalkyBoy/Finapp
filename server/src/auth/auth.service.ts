import { ConflictException, Injectable } from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { admin } from './firebase-admin';

@Injectable()
export class AuthService {

    async signInWithFirebase(token: string){
        const decodedToken = await admin.auth().verifyIdToken(token);
        const {email, name, uid} = decodedToken;

        if (!email) {
            throw new Error('Email is required')
        }

        let user = await this.prisma.user.findUnique({where: {email}});

        if (!user) { 
            user = await this.prisma.user.create({
                data: {
                    email,
                    fullName:name || '',
                    firebaseUid: uid,
                    otpVerified: false,
                },
            });
        }
        return {
            userId: user.id,
            requireOtp: !user.otpVerified,
        }
    }
    constructor(private prisma: PrismaService){}

    async signup(fullName: string, email: string, password: string){
        const existingUser = await this.prisma.user.findUnique({where: {email}});
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            }
        });
        return {id: user.id, email: user.email};
    }
}
