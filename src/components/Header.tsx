import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className='flex juctify-start items-start pl-5 py-5 gap-x-2'>
      <Image src='/chat.svg' alt='chat' width={24} height={24} />
      <h2 className='font-bold'>Great Project</h2>
    </header>
  );
};

export default Header;