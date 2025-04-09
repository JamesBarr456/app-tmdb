import FormRegister from '@/components/forms/form-register';
import Link from 'next/link';
import React from 'react';

function Register() {
  return (
    <>
      <h1 className="text-white text-4xl mb-10">Sign Up</h1>
      <FormRegister />
      <p className="text-center">
        Alread have an account?{' '}
        <Link href={'/login'} className="text-bright-red">
          Login
        </Link>
      </p>
    </>
  );
}

export default Register;
