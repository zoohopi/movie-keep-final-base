"use client";

import styles from "./AuthButton.module.css";

import { useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { Favorite } from "@/types/favorite";

export default function AuthButton() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  // 1. Firebase에서 확인한 로그인 사용자를 Store에 반영합니다.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // TODO 01 [과제 1]: currentUser를 setUser()에 전달하세요.
      setUser(currentUser);
    });
    return unsubscribe;
  }, [setUser]);

  // 2. 로그인 사용자가 바뀌면 그 사용자의 찜을 조회합니다.
  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setFavorites(() => []);
        return;
      }

      try {
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", user.uid),
        );
        const snapshot = await getDocs(q);
        const favoriteList: Favorite[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            userId: data.userId,
            movieId: data.movieId,
            // TODO 04 [과제 2]: data.memo가 null/undefined이면 ??로 빈 문자열을 사용하세요.
            memo: data.memo ?? "",
          };
        });
        // TODO 02 [과제 1]: setFavorites()로 favoriteList를 Store에 반영하세요.
        setFavorites(() => favoriteList);
      } catch (error) {
        console.error(error);
      }
    }

    loadFavorites();
  }, [user, setFavorites]);

  async function handleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return user ? (
    <div className={styles.account}>
      <div className={styles.identity}>
        <span className={styles.name}>{user.displayName ?? "회원"} 님</span>
      </div>
      <button
        className={styles.logoutButton}
        type="button"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  ) : (
    <button className={styles.loginButton} type="button" onClick={handleLogin}>
      Google 로그인
    </button>
  );
}
