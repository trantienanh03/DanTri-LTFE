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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
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

  //dòng này để khi thêm kết nối mới nó ko lưu tên mới vào session gây hiển thị nhầm tên
  const displayName = (() => {
    if (!user) return '';
    const sortedIdentities = [...(user.identities || [])].sort(
      (a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
    );
    const primaryIdentity = sortedIdentities[0];
    return primaryIdentity?.identity_data?.full_name || 
           primaryIdentity?.identity_data?.name || 
           user.user_metadata?.full_name;
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
