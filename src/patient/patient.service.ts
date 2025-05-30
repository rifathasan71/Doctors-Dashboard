import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
const PDFDocument = require('pdfkit'); 


import { Response } from 'express';
import { createWriteStream } from 'fs';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // a) Find one patient by ID
  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  // b) Update medical info: diagnosis, prescription, treatment_plan
  async updateMedical(id: number, dto: UpdateMedicalDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  // c) Update progress notes and next appointment
  async updateProgress(id: number, dto: UpdateProgressDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  // d) Update discount percentage
  async updateDiscount(id: number, dto: UpdateDiscountDto): Promise<Patient> {
    const patient = await this.findOne(id);
    patient.discount_percentage = dto.discount_percentage;
    return this.patientRepository.save(patient);
  }
  // generate pdf
  async generatePrescriptionPdf(id: number, res: Response) {
    const patient = await this.findOne(id);
    if (!patient) throw new NotFoundException('Patient not found');
  
    const doc = new PDFDocument();
    const fileName = `Prescription_Patient${id}.pdf`;
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  
    doc.pipe(res);
  
    doc.fontSize(20).text('Medical Prescription', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Patient Name: ${patient.name}`);
    doc.text(`Age: ${patient.age}`);
    doc.text(`Gender: ${patient.gender}`);
    doc.moveDown();
  
    doc.fontSize(14).text('Diagnosis:');
    doc.fontSize(12).text(patient.diagnosis || 'N/A');
    doc.moveDown();
  
    doc.fontSize(14).text('Prescription:');
    doc.fontSize(12).text(patient.prescription || 'N/A');
    doc.moveDown();
  
    doc.fontSize(14).text('Treatment Plan:');
    doc.fontSize(12).text(patient.treatment_plan || 'N/A');
  
    doc.end();
  }
  
}
