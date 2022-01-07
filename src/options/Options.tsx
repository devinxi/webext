import PixelArtsIcon from "~icons/pixelarticons/zap";
import PixelArtsSliders from "~icons/pixelarticons/sliders";
import { storageLocal } from "~/logic";
import { createResource, Show } from "solid-js";

export function Options() {
  const [data, { mutate }] = createResource(() => storageLocal.getItem("name"));
  return (
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <PixelArtsSliders class="icon-btn mx-2 text-2xl" />
      <div>Options</div>
      <p class="mt-2 opacity-50">This is the options page</p>

      <Show when={data()}>
        <input
          value={data()}
          onChange={v => {
            mutate(v.currentTarget.value);
            storageLocal.setItem("name", v.currentTarget.value);
          }}
          class="border border-gray-400 rounded px-2 py-1 mt-2"
        />
      </Show>

      <div class="mt-4">
        Powered by Vite <PixelArtsIcon class="align-middle" />
      </div>
    </main>
  );
}
