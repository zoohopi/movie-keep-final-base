"use client";

import { useState } from "react";
// TODO 03-a [과제 2]: updateDoc을 추가로 가져오세요.
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { Favorite } from "@/types/favorite";
import styles from "./FavoriteMemo.module.css";

type FavoriteMemoProps = {
  favorite: Favorite;
};

export default function FavoriteMemo({ favorite }: FavoriteMemoProps) {
  // 입력 중인 메모를 관리합니다.
  const [memo, setMemo] = useState(favorite.memo);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  async function handleSave() {
    setIsSaving(true);
    setMessage("");

    try {
      // 1. 기존 찜 문서를 지정합니다.
      const favoriteId = `${favorite.userId}_${favorite.movieId}`;
      const favoriteRef = doc(db, "favorites", favoriteId);

      // 2. DB 저장에 성공한 뒤에만 다음 코드를 실행합니다.
      // TODO 03-b [과제 2]: 아래 임시 오류를 지우고, favoriteRef에 memo를 저장하세요.
      // await로 저장 완료를 기다립니다. 아래 Store 갱신 코드는 제공합니다.
      await updateDoc(favoriteRef, { memo });

      // 3. 현재 Store에서 같은 사용자·영화의 메모만 바꿉니다.
      setFavorites((prev) =>
        prev.map((item) => {
          const isTarget =
            item.userId === favorite.userId &&
            item.movieId === favorite.movieId;

          return isTarget ? { ...item, memo } : item;
        }),
      );

      setMessage("메모를 저장했습니다.");
    } catch (error) {
      console.error(error);
      setMessage("저장하지 못했습니다. TODO 03 구현 여부와 로그인·찜 상태를 확인해 주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className={styles.memoSection} aria-label="찜한 영화 메모">
      <label htmlFor={`memo-${favorite.movieId}`} className={styles.label}>
        메모 (선택)
      </label>
      <div className={styles.memoWrapper}>
        <textarea
          id={`memo-${favorite.movieId}`}
          className={styles.input}
          value={memo}
          onChange={(event) => {
            setMemo(event.target.value);
            setMessage("");
          }}
          placeholder="이 영화에 대해 남기고 싶은 메모를 작성해주세요."
          rows={1}
          disabled={isSaving}
        />
        <button
          className={styles.saveButton}
          type="button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "저장 중..." : "메모 저장"}
        </button>
      </div>

      <p className={styles.message} role="status">
        {message}
      </p>
    </section>
  );
}
