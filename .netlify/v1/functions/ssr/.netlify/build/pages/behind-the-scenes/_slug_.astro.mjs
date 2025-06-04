/* empty css                                       */
import { e as createComponent, r as renderTemplate } from '../../chunks/astro/server_DFr5Kd-h.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/portfolio-project/rickeyportfolio/src/pages/behind-the-scenes/[slug].astro", void 0);

const $$file = "C:/portfolio-project/rickeyportfolio/src/pages/behind-the-scenes/[slug].astro";
const $$url = "/behind-the-scenes/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
