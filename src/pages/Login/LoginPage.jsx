import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';


//import { EMAIL } from '../../constants/patterns';
export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const EMAIL = {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
    message: 'Email Is Not Valid',
  };
  const navigate = useNavigate();
   const { user, login } = useAuth();
  //const [user,setUser]= useState();
  //const[login,setLogin] = useState();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
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

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />
          <Button type="submit" text="Login" />
          <div className={classes.register}>
            
            <Link to={`/forgot-password${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              ForgotPassword
            </Link>
          </div>
          <div className={classes.register}>
            Don't have an account ? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
