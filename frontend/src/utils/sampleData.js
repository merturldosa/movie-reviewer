import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS } from './constants';

/**
 * 샘플 리뷰 데이터 생성 및 추가
 */
export const addSampleReviews = () => {
  const userId = 'default-user';
  const userName = 'Movie Lover';
  const userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=MovieLover';

  const sampleReviews = [
    {
      id: uuidv4(),
      userId,
      userName,
      userAvatar,
      movieId: 1010581,
      movieTitle: '나의 잘못',
      moviePoster: 'https://image.tmdb.org/t/p/w342/duT8Vks5FXwDkpxoR84xb2a6VB6.jpg',
      rating: 4,
      title: '감동적이고 아름다운 러브스토리',
      content: '의붓 남매 간의 금지된 사랑을 다룬 작품입니다. 주인공들의 케미스트리가 정말 좋았고, 스토리 전개도 흥미진진했어요. 특히 두 주인공의 연기가 인상적이었습니다. 로맨스 영화를 좋아하시는 분들께 추천합니다!',
      watchedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 전
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      userId,
      userName,
      userAvatar,
      movieId: 1038392,
      movieTitle: '컨저링: 마지막 의식',
      moviePoster: 'https://image.tmdb.org/t/p/w342/y9jKDJuf5WCDjSPsqkt1cb0JHGm.jpg',
      rating: 5,
      title: '컨저링 시리즈 중 최고!',
      content: '와... 정말 무서웠어요. 컨저링 시리즈를 좋아해서 기대하고 봤는데 기대 이상이었습니다. 워렌 부부의 마지막 사건이라는 점에서 더 감동적이었고, 공포 연출도 수준급이었습니다. 특히 마지막 30분은 정말 숨을 멈추고 봤네요. 공포 영화 팬이라면 꼭 보세요!',
      watchedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      userId,
      userName,
      userAvatar,
      movieId: 1311031,
      movieTitle: '극장판 귀멸의 칼날: 무한성편',
      moviePoster: 'https://image.tmdb.org/t/p/w342/m6Dho6hDCcL5KI8mOQNemZAedFI.jpg',
      rating: 5,
      title: '애니메이션의 정점! 작화가 예술이다',
      content: '유포터블의 작화는 정말 말이 필요 없습니다. 극장에서 봐야 제맛! 무한성편은 정말 스케일이 압도적이고, 액션 신도 화려했어요. 탄지로와 상현들의 대결은 정말 손에 땀을 쥐게 만들었습니다. 원작 팬으로서 완벽한 각색이었다고 생각합니다. 귀칼 팬이라면 무조건 극장에서 보셔야 합니다!',
      watchedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // 기존 리뷰 가져오기
  const existingReviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');

  // 샘플 리뷰 추가 (중복 체크)
  const newReviews = [...existingReviews];
  sampleReviews.forEach(sample => {
    const exists = existingReviews.some(
      review => review.movieId === sample.movieId && review.userId === sample.userId
    );
    if (!exists) {
      newReviews.push(sample);
    }
  });

  // localStorage에 저장
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(newReviews));

  console.log(`✅ ${sampleReviews.length}개의 샘플 리뷰가 추가되었습니다!`);
  console.log('페이지를 새로고침하세요.');

  return newReviews;
};

/**
 * 모든 리뷰 삭제 (테스트용)
 */
export const clearAllReviews = () => {
  localStorage.removeItem(STORAGE_KEYS.REVIEWS);
  console.log('✅ 모든 리뷰가 삭제되었습니다!');
  console.log('페이지를 새로고침하세요.');
};

// 개발 환경에서 window 객체에 함수 노출
if (import.meta.env.DEV) {
  window.addSampleReviews = addSampleReviews;
  window.clearAllReviews = clearAllReviews;
  console.log('🔧 개발 모드: window.addSampleReviews() 또는 window.clearAllReviews() 를 사용할 수 있습니다.');
}
