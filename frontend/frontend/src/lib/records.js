// src/lib/records.js
import { IMG, searchMovies } from "./tmdb.js";

const RECORDS_KEY = "moviereviewer:records";

function readRecordsFromStorage() {
  try {
    const stored = localStorage.getItem(RECORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to read records from localStorage", e);
    return [];
  }
}

function writeRecordsToStorage(records) {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Failed to write records to localStorage", e);
  }
}

/**
 * 레코드 스키마(예상)
 * { id, title, rating, review, createdAt, tmdbId?, poster_path? }
 *
 * getRecords()는 createdAt 내림차순으로 정렬해서 반환
 * 실제 백엔드 연동 시 이 파일만 교체하면 됨.
 */

const posterCache = new Map(); // title or tmdbId -> poster_path

async function resolvePosterPath(rec) {
  if (rec.poster_path) return rec.poster_path;

  const cacheKey = rec.tmdbId ? `id:${rec.tmdbId}` : `title:${rec.title}`;
  if (posterCache.has(cacheKey)) return posterCache.get(cacheKey);

  // tmdbId가 있으면 더 정확하지만, 여기선 title로 fallback
  let found = null;
  try {
    const results = await searchMovies(rec.title);
    found = results?.[0] || null;
  } catch (_) {}

  const path = found?.poster_path || found?.backdrop_path || "";
  posterCache.set(cacheKey, path);
  return path;
}

export async function getRecords() {
  const mock = readRecordsFromStorage();

  // 최신순 정렬
  mock.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 포스터 경로 해상
  const withPoster = await Promise.all(
    mock.map(async (rec) => {
      const p = await resolvePosterPath(rec);
      return { ...rec, poster_path: p };
    })
  );

  return withPoster;
}

export async function saveRecord(newRecord) {
  const records = readRecordsFromStorage();
  const now = new Date().toISOString();
  const recordToSave = {
    id: `r${Date.now()}`,
    ...newRecord,
    createdAt: now,
  };
  const updatedRecords = [recordToSave, ...records];
  writeRecordsToStorage(updatedRecords);
  return recordToSave;
}

export function imgUrlFromPosterPath(poster_path) {
  return IMG.w500(poster_path) || IMG.w300(poster_path) || IMG.original(poster_path) || "";
}
