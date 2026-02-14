
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface USSDState {
  screen: 'home' | 'register' | 'balance' | 'levy' | 'withdraw';
  input: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  businessType: string;
  nin: string;
  pin: string;
  balance: number;
  levyDue: number;
}
