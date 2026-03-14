import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LockKeyhole } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchCurrentUser, login } from "@/lib/api";

const DashboardLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ loginEmail, loginPassword }: { loginEmail: string; loginPassword: string }) =>
      login(loginEmail, loginPassword),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      navigate("/dashboard");
    },
  });

  if (authQuery.isSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_32px_80px_-30px_hsl(var(--ink)/0.22)] md:p-10">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10" variant="secondary">
              Dashboard login
            </Badge>
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-syne text-4xl font-extrabold">Beveiligde toegang</h1>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Alleen ingelogde beheerders mogen aanvragen, uploads en tickets bekijken. Zet hier je eigen admin-account achter en laat Cloudflare Access daar bovenop werken.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                <LockKeyhole className="h-7 w-7" />
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                void loginMutation.mutateAsync({ loginEmail: email, loginPassword: password });
              }}
            >
              <label className="block space-y-2">
                <span className="text-sm font-bold text-foreground">E-mail</span>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-foreground">Wachtwoord</span>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>

              {loginMutation.isError ? (
                <p className="text-sm font-bold text-destructive">
                  {(loginMutation.error as Error).message}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="rounded-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Inloggen..." : "Inloggen"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardLogin;
