/**
 * Static copy and image URLs for detail UI layout (no TMDB wiring).
 * Mirrors resources/movie-showDetail.html.
 */

export const DETAIL_BACKDROP_URI =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBDYhgFwtiup76PPRuzg7SGYDnrnnABWgOIDKSglBaqyoBy8wTlBCGVPO8Yl5hA4H7xODR0A7p0NEBOLt0iGGz2ixBdNaT7gGOm7UDW68WK9zJuCjSgOpZRBAjKNN_OSxfrzPqm2ak3uzIvJjAbB2d4c8W0nDKsYZumryk3I-eywZxrvoDfKY7g-ZfBR3IJaZBtXKuYJXr-416azyQvpV6vM01vUeyU0bvJtEMLPCPOwRsCMrXhI8NqLiJB89ZkiGV7S2Vx_0VNNyvp';

export const DETAIL_TITLE = 'Neon Drift';

export const DETAIL_OVERVIEW =
  'In a sprawling metropolis fueled by bioluminescent technology, a disgraced pilot is forced back into the high-stakes underworld of illegal street racing. As the lines between human and machine blur, he must navigate a web of corporate espionage and neon-lit danger to save the city he once called home.';

export const DETAIL_CAST = [
  {
    name: 'Alex Rivera',
    character: 'Kaelen',
    photoUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtMLmpS65biudrCdZ4sPWFtekxqILNO2i6dETVddcwSjqbh2ZDvEt2feLrSmwAf1Oe51v0w66x1nevA-wI4L21OiTPayhuOu2hA6i0ZmfVVm06J5BizMY3EPi8Rl36o8h-pk0BfcKfKCyqoBImJKq84gWabrFFrUxgEjDbZj_BZyzMKaeyFF_Gw-QXSMfxOCntnf7TIdz8w3aisd3yuPFMegmY6apCk2jz5Kjty6kW4PYpYQX7rtZqvtEzmdyydXjC7fsloCEdcWyF',
  },
  {
    name: 'Mina Sato',
    character: 'Nyx',
    photoUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDayKDKWh22CAQMnp532k-1O_7yGdxicDyxnXzcXgfxCslFuqNkJCiIsUqTPSIiIZeEvn8n0Oh0WeLi1Y0PxNsK7QGbgnfK8BUBoBAVEaNNq5p6IVFhJvIlDhy7hPRX3eCqnwYvn6SyFifKFbYwd0rgJXgfMm5x6K80o3pPl-Ni3VNhdiIS_W6oadvvPVLgsyzn_WlZLFDDrYFk-PUWRMNKrl8C1n9ZuNLjEJyVvFdYIRt-A8psFMhjsBgyKj7Omjqe5ZJKjSHLRvsK',
  },
  {
    name: 'Victor Vane',
    character: 'The Boss',
    photoUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4ke2RlhwzftY4OGfhr0DjHycgzQLwWqM4OSivfB7ci7cmFDWr5KYvXiUO9ARgGUeHwb2qcMXaknNyOq9KGgJ75TCiP3g-3DuXyrTHlqKxnL3eh1aG6TMWqiGL3DIuKcC3pvuSqUqHj1nt5I6a4lfuNXaeDqgjgaO_NeavLXqYAmV41i8UNJO-OI5qqpXs_fVyJhdOxUcl8PKCobmRDONzuqg7J9-UmvtO3jJpl0B1W5OU4Y2zxU6dIg0eyTRudIiR7GovdLAnoH92',
  },
] as const;

export const DETAIL_SIMILAR = [
  {
    title: 'Synth City',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADIsMvs8tln25Pkb9wtBufwQ2VlsF0VpJ9OghfYkreS4zUKqkI24aOKs08Pvk1uIXK8zmEbmvrBopDC0_IGTQ1izXUts7cO_qgpuYTNDUzAXWuNemgttUMpDkUdZMiVOkjb4-sZMEIZzbu4m7y2_9NQaCjswKQTMzB4MtlATex7uApSyw_XUu2msFfcrAyposHI8392ag-PKKiwFj4ISPpau3FwG-6UU4BVhaFRDN14_dVdlJ8UcbjTIMYq5YB1SJ4MZE5lbTCH86A',
  },
  {
    title: 'Digital Ghost',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJDfP9pQXNdWrSvGQwEGyc7-se5oGr_72djgxDpuBiL9G7S_F0iPquSUflEutCr2odjEWpCMFYtlucNwqt0zqR2q9kVhlccUzYRPKzdM2PA8elt8hjZFm9cIuYg89OgUe45pKzlNLSLbFUZX2Xvs8GLTyzB_cHRTYHB7d445zql6VFRz5v8mBi2JBtY_52kKAm7RkObq-Apwbtc75GQVCoFydYFfsUTiVqaViP421dUD77aiBuLujTW7ETgsZCQ-JQ4ID4dKNfnN49',
  },
] as const;
