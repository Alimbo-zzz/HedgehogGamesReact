import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import AutoZip from 'vite-plugin-auto-zip';
import { imagetools } from 'vite-imagetools'



export default [
	react(),
	legacy({ targets: ['IE >= 11'] }),
	sassGlobImports(),
	imagetools(),
	// AutoZip()
];
