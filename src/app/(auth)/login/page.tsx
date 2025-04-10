import FormLogin from '@/components/forms/form-login';
import Link from 'next/link';

function Login() {
  return (
    <>
      <h1 className="text-white text-4xl mb-10">Login</h1>
      <FormLogin />
      <p className="text-center">
        Don’t have an account?{' '}
        <Link href={'/register'} className="text-bright-red">
          Sign Up
        </Link>
      </p>
    </>
  );
}

export default Login;
