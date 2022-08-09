import React, { useEffect, useState, useTransition } from 'react';

function Okey() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log(isPending);
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  return (
    <div>
      {isPending}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}

export default Okey;
