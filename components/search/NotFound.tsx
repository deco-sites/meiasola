export function NotFound() {
  return (
    <div class="w-full py-10 laptop:border-b laptop:border-grey-1">
      <div class="container flex flex-col gap-[21px] justify-center items-center ">
        <span class="uppercase font-bold text-h3">
          Não encontramos o que você buscou
        </span>
        <p class="text-body text-black">
          Desculpe, não encontramos resultados para a sua busca, mas não perca a
          oportunidade de conferir nossas novidades abaixo.
        </p>
      </div>
    </div>
  );
}
