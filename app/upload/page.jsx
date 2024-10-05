"use client";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState();
  const [urls, setUrls] = useState(null);
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                console.log(progress);
              },
            });
            console.log(res);
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Upload
      </button>
      {urls?.url && (
        <Link href={urls.url} target="_blank">
          url
        </Link>
      )}
      {urls?.thumbnailUrl && (
        <Link href={urls.thumbnailUrl} target="_blank">
          thumbnail
        </Link>
      )}
    </div>
  );
}
