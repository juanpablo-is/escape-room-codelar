import { useEffect, useId } from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { Button } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Cart = ({ message }) => {
  const { socket, setState, isLeader, idTeam } = useGame();

  function handlerSubmitCart(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const words = formData.entries().reduce((acc, [keyWord, value]) => {
      acc[keyWord] ||= '';
      acc[keyWord] += value;

      return acc;
    }, {});

    socket.emit('game:team:send-cart', { words: Object.values(words), idTeam });
  }

  useEffect(() => {
    socket.on('game:team:show-results', (data) =>
      setState(states.RESULT, data)
    );
    return () => socket.off('game:team:show-results');
  }, [socket]);

  return (
    <div className="text-white text-2xl flex justify-center items-center font-tertiary flex-col gap-10 z-50 w-full h-full max-w-2xl">
      <form className="flex flex-col gap-4" onSubmit={handlerSubmitCart}>
        <section className="markdown">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              hide(d) {
                return <WordHidden word={d.children} />;
              },

              p(props) {
                const { node, ...rest } = props;
                return <div {...rest} />;
              },
            }}
          >
            {message}
          </Markdown>
        </section>

        {isLeader && <Button>Enviar resultado</Button>}
      </form>
    </div>
  );
};

export default Cart;

const WordHidden = ({ word }) => {
  const id = useId();

  return (
    <div className="inline-block">
      {word.split(' ').map((w, i) => (
        <div key={i} className="inline-block m-1">
          {Array.from({ length: w.length }).map((letra, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={letra}
              name={id}
              required
              className="border border-white text-center w-6 bg-primary/40"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
