"use client"
import React, { FormEvent } from 'react';
import { signIn  } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer , toast } from 'react-toastify';

import Link from 'next/link';

function Signup(): JSX.Element {
  
  const router = useRouter();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    toast.info("Nous vérifions votre identité, veuillez patienter un peu !",{position:'top-center',autoClose:1000})

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, 
    });
    
    if (!result?.error) {
      toast.success("bienvenu ! vous allez être redirigé vers notre plateforme principale",{position:'top-center'})
      return router.push('/'); 
    } else { 
      toast.error("Ops ! Quelque chose s'est mal passé, veuillez vous assurer que vous saisissez les bonnes données",{position:'top-center'})
      console.error(result?.error);
    }
  };

  return (

      <div className="absolute text-white  left-1/2 -translate-x-1/2 -translate-y-3/4 lg:-translate-y-2/3  ">
        <ToastContainer/>
        <div className="w-80 md:w-96 bg-transparent rounded-xl drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]">
          <div className="bg-night rounded-t-xl text-2xl font-bold p-2 text-center">Se connecter</div>
          <div className="bg-black bg-opacity-50 rounded-b-xl pt-10 px-2 mb-3">
            <h3 className="text-center text-white font-semibold text-lg">Connectez-vous à votre compte</h3>
            <h3 className="text-center text-white font-semibold text-lg">
              Bienvenue ! Authentifiez-vous pour trouver votre prochaine destination
            </h3>
            <div className="py-10 text-center space-y-3">
              <form onSubmit={handleSubmit}>
                <div className="space-y-2 my-2">
                  <div className="space-y-1">
                    <label htmlFor="email">Entrer votre email</label>
                    <input name="email" type="email" id="email" placeholder="Email" className="input w-full text-night max-w-xs" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password">Mot de passe</label>
                    <input name="password" type="password" id="password" placeholder="Password" className="input w-full text-night max-w-xs" />
                  </div>
                </div>
                <button  name='submiter' type="submit" className="font-bold w-full border-night space-x-3 cursor-pointer bg-white text-night border-2 max-w-xs mx-auto rounded-xl p-3 hover:bg-night hover:text-white transition duration-300 ease-out ">
                    Continuer
                </button>
                <Link href={"/auth/register"} className="btn w-full border-night mt-3 cursor-pointer bg-white text-night border-2 max-w-xs mx-auto rounded-xl p-3 hover:bg-night hover:text-white transition duration-300 ease-out">
                    Je suis nouveau ici ! 
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Signup;
