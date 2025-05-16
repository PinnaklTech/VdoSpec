// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }




import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="flex justify-center items-start pt-32 min-h-screen bg-white dark:bg-[#101010]">
      <SignIn />

    </div>
  );
};

export default Signin;
