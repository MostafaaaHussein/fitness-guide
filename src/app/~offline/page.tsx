export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-sm space-y-3">
        <h1 className="text-2xl font-semibold">You’re offline</h1>
        <p className="text-muted-foreground">
          Reconnect to continue using your fitness guide.
        </p>
      </div>
    </main>
  );
}
