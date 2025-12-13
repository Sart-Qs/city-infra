import { useState } from "react";
import Input from '../../components/input/input';
import Button from "../../components/button/button";
import loginBg from '../../assets/loginBg.png';
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../services/loginService";
import type { IUser } from "../../model/user";
import { connect } from "../../services/messagesService";
import type { IRegisterUser } from "../../services/registerUser";



function LoginPage() {
  let loginUserData: IUser = {userName: '', password: ''};
  const [regUser, setRegUser ] = useState<IRegisterUser>({
    email: "",
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    userName: ""
  });
  const [isOpenRegForm, setRegForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      if(loginUserData !== undefined){

        const success = await loginUser(loginUserData);

        if(success){
          navigate("/map");
        }

      }
      //TODO Добавить обработчик если данные введены неверно
    } catch (error) {
      
    }
  }

  const handleRegister = async () => {
    console.log(regUser);
    try{
      if (regUser !== undefined){

        const success = await registerUser(regUser);
        if(success){
          navigate("/map")
        } 
      }
    } catch(error){

    }
  }

  const changeRegisterUser = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setRegUser(prev => ({...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleRegisterForm = () => {
    setRegForm(!isOpenRegForm);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Форма входа */}
      <div className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 transform ${isOpenRegForm ? 'hidden' : 'absolute'}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Добро пожаловать</h1>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>
        <div className="space-y-6">
          <Input name="Логин" type="login" onChange={(e) => {loginUserData.userName = e.target.value}}/>
          <Input name="Пароль" type="password" onChange={(e) => {loginUserData.password = e.target.value}}/>
          <div className="flex justify-end">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer hover:underline">
              Восстановить пароль?
            </button>
          </div>

          <div className="space-y-4">
            
            <Button name="Вход" onClick={handleLogin}/>
            
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 grow"></div>
              <span className="mx-4 text-gray-500 text-sm">или</span>
              <div className="border-t border-gray-300 grow"></div>
            </div>

            <Button name="Регистрация" onClick={toggleRegisterForm}/>
          </div>
        </div>
      </div>

      {/* Форма регистрации */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 transform ${
          isOpenRegForm ? 'absolute scale-100' : 'scale-95 hidden'
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Создать аккаунт</h1>
          <p className="text-gray-600">Заполните данные для регистрации</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              name="firstName" 
              type="text"
              onChange={(e) => {changeRegisterUser(e)}}
            />
            <Input 
              name="lastName" 
              type="text"
              onChange={(e) => {changeRegisterUser(e)}}
            />
          </div>
          
          <Input 
            name="email" 
            type="email"
            onChange={(e) => {changeRegisterUser(e)}}
          />
          
          <Input 
            name="login" 
            type="login"
            onChange={(e) => {changeRegisterUser(e)}}
          />

          <Input 
            name="userName" 
            type="userName"
            onChange={(e) => {changeRegisterUser(e)}}
          />

          <Input 
            name="password" 
            type="password"
            onChange={(e) => {changeRegisterUser(e)}}
          />
          
          <Input 
            name="validPassword" 
            type="password"
          />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button name="Назад" onClick={toggleRegisterForm}/>
            <Button name="Регистрация" onClick={handleRegister}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;