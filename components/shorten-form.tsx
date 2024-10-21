"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                url
            })
        });
        await response.json();
        setUrl("");
    } catch (error) {
        console.error('Error shortening URL: ', error);
    } finally {
        
    }
  };
  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          className="h-12"
          type="url"
          placeholder="Enter URL to shorten"
          required
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <Button className="w-full p-2" type="submit">
          Shorten URL
        </Button>
      </div>
    </form>
  );
}
