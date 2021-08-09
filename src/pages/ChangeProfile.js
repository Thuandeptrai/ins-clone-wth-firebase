import React, { useContext } from 'react'
import {DEFAULT_IMAGE_PATH} from '../constants/paths'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import {storage,firebase} from '../lib/firebase'
import { getUserByUserId } from '../services/firebase'
import { useState, useEffect } from 'react';
import useUser from '../hooks/use-user'
import ChangeProfile1 from '../components/Changeprofile'




export default function ChangeProfile() {
    
    const{user:{uid:userId }} = useContext(UserContext)
    const {user} = useUser(userId)
        return (<>
        <ChangeProfile1  proflePic={user?.profilePic}/>
        </>
    )
}
