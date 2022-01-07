import { createSignal } from "solid-js";
import PixelArtsIconPower from "~icons/pixelarticons/power";

export function App() {
  const [show, setShow] = createSignal(false);
  return (
    <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
      <div
        class={`bg-white text-gray-800 rounded-full shadow w-max h-min p-x-4 p-y-2 my-auto mr-2 transition-opacity transition-duration-300 ${
          show() ? "opacity-100" : "opacity-0"
        }`}
      >
        Vitesse WebExt
      </div>
      <div
        class="flex w-10 h-10 rounded-full shadow cursor-pointer bg-teal-600 hover:bg-teal-700"
        onClick={() => setShow(!show())}
      >
        <PixelArtsIconPower class="block m-auto text-lg" />
      </div>
    </div>
  );
}
