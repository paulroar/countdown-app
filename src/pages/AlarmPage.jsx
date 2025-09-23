import { useState, useEffect, useRef } from 'react';
import Clock from '../components/Clock';

export default function AlarmPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-24">
      <Clock />
    </div>
  );
}