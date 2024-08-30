import { useState } from "preact/hooks";

interface Props {
  maxCharacters: number;
  text: string;
}

export default function ReadMoreText({ maxCharacters, text }: Props) {
  const [textShown, setTextShown] = useState(false);

  const max = maxCharacters > 0 ? maxCharacters : text.length;
  const show = textShown ? text : text.slice(0, max);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #readMoreText h4 {
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1.94px;
          }
            
          @media(min-width: 991px) {
            #readMoreText h4 {
              font-size: 20px;
            }
          }
          `,
        }}
      />
      <div
        id={"readMoreText"}
        class="text-body laptop:text-large font-normal"
        dangerouslySetInnerHTML={{
          __html: show,
        }}
      />

      {maxCharacters > 0 && text.length > maxCharacters && (
        <button
          href="#"
          class="flex text-body laptop:text-large underline mt-6"
          onClick={() => setTextShown((textShown) => !textShown)}
        >
          {textShown ? "Leia menos" : "Leia mais"}
        </button>
      )}
    </>
  );
}
