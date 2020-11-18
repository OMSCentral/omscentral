import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Nullable } from 'src/core';
import useQueryParams from 'src/core/hooks/useQueryParams';
import { FirebaseContext } from 'src/components/Firebase';
import { NotificationContext } from 'src/components/Notification';
import SetPassword, { FormData } from './SetPassword';

const SetPasswordContainer: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const notification = useContext(NotificationContext)!;
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<Nullable<string>>(null);
  const { oobCode = null } = useQueryParams<{ oobCode: string }>();

  const verifyPasswordResetCode = async () => {
    if (!oobCode) {
      return setError(true);
    }
    setLoading(true);
    try {
      setEmail(await firebase.auth.verifyPasswordResetCode(oobCode));
    } catch (error) {
      setError(true);
      notification.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPasswordResetCode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async ({ password }: FormData) => {
    setLoading(true);
    try {
      await firebase.auth.confirmPasswordReset(oobCode!, password);
      notification.success(`Password set, logging in...`);
      await firebase.auth.signInWithEmailAndPassword(email!, password);
    } catch (error) {
      notification.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Set Password">
        <meta
          name="description"
          content="Set a new password for your account."
        />
      </Helmet>
      <SetPassword
        email={email}
        disabled={loading || error}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SetPasswordContainer;
