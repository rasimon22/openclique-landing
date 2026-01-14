"use client";

import { useReducer, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";

type FormState = {
  name: string;
  email: string;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
  debouncedEmail: string;
};

type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_DEBOUNCED_EMAIL"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGE"; payload: { type: "success" | "error"; text: string } | null }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  name: "",
  email: "",
  isLoading: false,
  message: null,
  debouncedEmail: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_DEBOUNCED_EMAIL":
      return { ...state, debouncedEmail: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "RESET_FORM":
      return { ...state, name: "", email: "", debouncedEmail: "", message: null };
    default:
      return state;
  }
}

export function SignupForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const subscribe = api.email.subscribe.useMutation({
    onSuccess: () => {
      dispatch({ type: "SET_MESSAGE", payload: { type: "success", text: "Thank you! We'll be in touch soon." } });
      dispatch({ type: "RESET_FORM" });
      setTimeout(() => dispatch({ type: "SET_MESSAGE", payload: null }), 5000);
    },
    onError: (error) => {
      dispatch({
        type: "SET_MESSAGE",
        payload: { type: "error", text: error.message || "Something went wrong. Please try again." },
      });
    },
  });

  // Debounce email input
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_EMAIL", payload: state.email });
    }, 300);

    return () => clearTimeout(timer);
  }, [state.email]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_NAME", payload: e.target.value });
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.debouncedEmail) return;

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await subscribe.mutateAsync({ email: state.debouncedEmail, name: state.name });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={state.name}
          onChange={handleNameChange}
          placeholder="John Doe"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={state.email}
          onChange={handleEmailChange}
          placeholder="you@example.com"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={state.isLoading || !state.debouncedEmail || !state.name}
        className="rounded-md bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
      >
        {state.isLoading ? "Joining..." : "Join the Community"}
      </button>

      {state.message && (
        <div
          className={`rounded-md px-4 py-3 text-sm font-medium ${
            state.message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {state.message.text}
        </div>
      )}
    </form>
  );
}
