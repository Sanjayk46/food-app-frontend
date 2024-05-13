import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import classes from './forgotpage.module.css';
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
    await auth.forgotPassword(data);
    navigate('/reset-password');
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Forgot Password" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL,
            })}
            error={errors.email}
          />
          <Button type="submit" text="Reset Password" />

          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
