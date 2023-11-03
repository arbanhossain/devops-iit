import { Controller, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRequestDto } from './dto/AuthRequestDto';

import connection from '../db/db';
import { postOTPDto } from './dto/postOTPDto';
// import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { RegistrationDto } from './dto/UserRegistrationDto';

import * as Sentry from "@sentry/node";

@Injectable()
export class AuthService {
  constructor() { }

  async sendOTP(authData: AuthRequestDto): Promise<any> {
    let phoneNumber = authData.phone;
    let nid = authData.id;

    // check if id exists
    // if yes, check if phone number matches

    let res = await connection.execute('select * from users where id = ? and phone = ?', [nid, phoneNumber])
    if (res.rows.length == 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    // create 7 digit otp and send to phone number
    let otp = Math.floor(1000000 + Math.random() * 9000000);
    console.log(otp);
    try {
      await fetch(`http://bulksmsbd.net/api/smsapi?api_key=${process.env.API_KEY}&type=text&number=${phoneNumber}&senderid=${process.env.SENDER_ID}&message=OTP%20for%20Tax%20Wizard%20is%20${otp}`)
  
      // store otp in db
      await connection.execute('INSERT INTO otp (id, pass) VALUES (?, ?)', [nid, otp])
      return {
        statusCode: 200,
        message: 'OTP sent'
      }
    } catch (error) {
      Sentry.captureException(new Error("OTP could not be sent"))
      throw new HttpException('OTP not sent', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async authenticateOTP(authData: postOTPDto): Promise<any> {
    let nid = authData.id;
    let otp = authData.otp;

    // check if id exists
    // if yes, check if phone number matches

    let res = await connection.execute('select * from otp where id = ? and pass = ?', [nid, otp])
    if (res.rows.length == 0) {
      Sentry.captureException(new Error("OTP verification not resolved"))
      throw new HttpException('Not found. Request for new OTP.', HttpStatus.NOT_FOUND)
    }

    // if yes, return success
    let token = jwt.sign({ id: nid }, process.env.JWT_SECRET, { expiresIn: 3600*8});

    return {
      statusCode: 200,
      token: token
    }
  }

  isValidToken(token: string, id: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET)
      let decoded = jwt.decode(token, {complete: true})
      return decoded.payload["id"] == id
    } catch (error) {
      return false
    }
  }

  async register(userData: RegistrationDto): Promise<any> {
    let nid = userData.id;
    let name = userData.name;
    let age = userData.age;
    let gender = userData.gender;
    let phone = userData.phone;

    // check if id exists
    const transaction = Sentry.startTransaction({op: "register", name: "Check if user exists"})
    let res = await connection.execute('select * from users where id = ?', [nid])
    transaction.finish()
    if (res.rows.length > 0) {
      Sentry.captureException(new Error("Existing user registration attempt"))
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    try {
      await connection.execute('INSERT INTO users (id, phone, name, age, gender, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [nid, phone, name, age, gender, (new Date()).toString()])
      return {
        statusCode: 200,
        message: 'User created'
      }
    } catch (error) {
      Sentry.captureException(error)
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}