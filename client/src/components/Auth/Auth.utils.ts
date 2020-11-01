import firebase from 'firebase/app';

import { UserInputType } from 'src/graphql';

export const toInput = (user: firebase.User): UserInputType => {
  const [providerData] = user.providerData;

  const email = user.email || providerData!.email || null;

  const name =
    user.displayName ||
    providerData!.displayName ||
    (email && email.split('@').shift()) ||
    null;

  const photo_url = user.photoURL || providerData!.photoURL || null;

  return {
    id: user.uid,
    auth_provider: providerData!.providerId,
    email,
    name,
    photo_url,
    last_signed_in: new Date().getTime(),
  };
};
