import React, { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext.hooks';
import { supabase } from '../lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        const { data: { user: freshUser } } = await supabase.auth.getUser();
        setUser(freshUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogle = () => signInWithOAuth('google');
  const signInWithFacebook = () => signInWithOAuth('facebook');
  const signInWithGithub = () => signInWithOAuth('github');

  const signInWithOAuth = async (provider: 'google' | 'facebook' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href,
      },
    });
    if (error) throw error;
  };

  const unlinkSocialAccount = async (provider: string) => {
    if (!user) return;

    // tìm identity tương ứng với provider
    const identity = user.identities?.find((id) => id.provider === provider);
    if (!identity) throw new Error(`Không tìm thấy liên kết cho ${provider}`);

    const { error } = await supabase.auth.unlinkIdentity(identity);
    if (error) throw error;

    // update lại session sau khi ngắt kết nối
    const { data: { user: updatedUser } } = await supabase.auth.getUser();
    setUser(updatedUser);
  };
  const displayName = (() => {
    if (!user) return '';

    const identities = user.identities || [];
    const userSignInTime = new Date(user.last_sign_in_at || 0).getTime();
    const loginIdentity = identities.find(id => 
      Math.abs(new Date(id.last_sign_in_at || 0).getTime() - userSignInTime) < 2000
    );

    if (loginIdentity) {
      return loginIdentity.identity_data?.full_name || 
             loginIdentity.identity_data?.name || 
             user.user_metadata?.full_name;
    }

    return user.user_metadata?.full_name || user.user_metadata?.name;
  })();

  const value = {
    user,
    session,
    loading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    unlinkSocialAccount,
    displayName
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
