"use client";

import Link from "next/link";
import Icon from "./Icon";

type Props={title?:string; onMore?:()=>void};

export default function HadithThreadHeader({title="Hadith",onMore}:Props){
  return <header className="hadith-thread-header">
    <div className="hadith-thread-header-inner">
      <Link href="/collections" className="thread-header-action" aria-label="Back">
        <span className="thread-back-arrow" aria-hidden="true">←</span>
      </Link>
      <div className="thread-header-title" title={title}>{title}</div>
      <button type="button" className="thread-header-action" aria-label="More options" onClick={onMore}>
        <span className="thread-more" aria-hidden="true">•••</span>
      </button>
    </div>
  </header>;
}
