"use client";
export default function SearchBar() {
  return (
    <div className="searchAll">
      <button type="button" className="searchBtn">
        <img src="/search.svg" alt="통합검색" />
      </button>
      <input type="text" placeholder="통합검색" />
    </div>
  );
}
