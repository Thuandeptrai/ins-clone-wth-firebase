import React from 'react'
import FirebaseContext from '../context/firebase';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

export default function ResetPassword() {

    const [email, setEmail] = useState('')
  const [error, setError] = useState('');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

    const handleReset =  async(event) =>
    {
        event.preventDefault();

        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          setError("Sucess")
        })
        .catch((error) => {
            setError(error.message)
            setEmail('')
          // ..
        });
    }

    const isInvalid = email ===''
    return (<>
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-lg text-red-primary">{error}</p>}

          <form  >
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`
        }
            onClick={handleReset}
            >
              Reset Password
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to="" className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
        </>
    )
}


