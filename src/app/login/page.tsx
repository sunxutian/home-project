import { loginAction } from "@/app/login/actions";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const hasError = params.error === "1";

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="eyebrow">Shared Login</p>
        <h1>Household Access</h1>
        <p>Use the shared household password to open the dashboard.</p>
        <form action={loginAction} className="login-form">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Enter Dashboard</button>
        </form>
        {hasError ? (
          <p className="form-error">The shared password did not match.</p>
        ) : null}
      </section>
    </main>
  );
}
