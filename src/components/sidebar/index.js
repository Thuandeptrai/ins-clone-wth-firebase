import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
  const { user: { docId = '', fullName, username, userId,profilePic, following } = {} } = useContext(
    LoggedInUserContext
  );

  return (
    <div className="p-4">
      <User username={username} profilePic={profilePic} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} profilePic ={profilePic} />
    </div>
  );
}
