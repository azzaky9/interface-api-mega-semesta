import {
  Avatar,
  Card,
  tokens
} from "@fluentui/react-components";
import AuthForm from "../forms/AuthForm";


export default function AuthScreen() {
  return (
    <div
      style={{ backgroundColor: tokens.colorBrandForeground2 }}
      className='h-screen w-full bg-gray-50 flex justify-center'
    >
      <Card
        className='max-w-[320px] w-[420px] h-fit my-32 bg-white py-8 px-5 rounded-md '
        appearance='outline'
      >
        <header className='grid place-content-center'>
          <Avatar
            color='colorful'
            idForColor='id-123'
            size={40}
            aria-label='Guest'
          />
        </header>

        <main className='px-2 pt-4'>
          <AuthForm />
        </main>
      </Card>
    </div>
  );
}


