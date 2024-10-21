"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Url } from "@/utils/types";

export default function UrlList() {
  const [urls, setUrls] = useState<Array<Url>>([]);
  const shortenerUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`
  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls?.map((url) => (
          <li className="flex items-center gap-2 justify-between" key={url.id}>
            {url?.originUrl ? (
              <Link
                href={url.originUrl}
                className="text-blue-500"
                target="_blank"
              >
                {url.shortCode}
              </Link>
            ) : (
              <span className="text-gray-500">Invalid URL</span>
            )}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted"
              >
                <CopyIcon className="h-4 w-4" />
                <span className="sr-only">Copy URL</span>
              </Button>
              <span className="flex items-center">
                <EyeIcon className="w-4 h-4" /> {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
