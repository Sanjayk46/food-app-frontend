import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import classes from './resetpage.module.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
//  const[user,setUser]=useState()
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');
  const EMAIL = {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
    message: 'Email Is Not Valid',
  };

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async data => {
    await auth.resetPassword(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
        <Input
            type=""
            label="OTP"
            {...register('OTP', {
              required: true,
              minLength: 5,
            })}
            error={errors.otp}
          />
          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: value =>
                value !== getValues('password')
                  ? 'Passwords Do No Match'
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <Button type="submit" text="submit" />
        </form>
      </div>
    </div>
  );
}
