export const HELP = `
<span class="grn">
███╗   ██╗██╗   ██╗███████╗██╗███╗   ██╗    ██████╗ ██╗  ██╗██╗   ██╗ ██████╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗ 
████╗  ██║╚██╗ ██╔╝██╔════╝██║████╗  ██║    ██╔══██╗██║  ██║╚██╗ ██╔╝██╔═══██╗    ██╔══██╗██║   ██║████╗  ██║██╔════╝ 
██╔██╗ ██║ ╚████╔╝ █████╗  ██║██╔██╗ ██║    ██████╔╝███████║ ╚████╔╝ ██║   ██║    ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║╚██╗██║  ╚██╔╝  ██╔══╝  ██║██║╚██╗██║    ██╔═══╝ ██╔══██║  ╚██╔╝  ██║   ██║    ██╔══██║██║   ██║██║╚██╗██║██║   ██║
██║ ╚████║   ██║   ███████╗██║██║ ╚████║    ██║     ██║  ██║   ██║   ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝   ╚═╝    ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
</span>

Hello, welcome to <u class="blu semibold">Nyein Terminal</u> [WIP]. Type one of these commands -

  <span class="rd semibold">about</span> - View about me
  <span class="rd semibold">neofetch / fastfetch / github</span> - View about Github profile 
  <span class="rd semibold">onefetch / repos</span> - View about my pinned repos/projects
  <span class="rd semibold">experience</span> - View experience
  <span class="rd semibold">links</span> - View contact info and links
  <span class="rd semibold">help</span> - View this help section
  <span class="rd semibold">theme / wal</span> - Cycle through themes
  <span class="rd semibold">history</span> - View command history
  <span class="rd semibold">whoami</span> - View current username
  <span class="rd semibold">echo</span> - Echo the input
  <span class="rd semibold">clear</span> - Clear screen

You can use <i>arrow keys</i> to scroll through history.
`;

export const CREDITS: string = `
<span class="grn">
███╗   ██╗██╗   ██╗███████╗██╗███╗   ██╗    ██████╗ ██╗  ██╗██╗   ██╗ ██████╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗ 
████╗  ██║╚██╗ ██╔╝██╔════╝██║████╗  ██║    ██╔══██╗██║  ██║╚██╗ ██╔╝██╔═══██╗    ██╔══██╗██║   ██║████╗  ██║██╔════╝ 
██╔██╗ ██║ ╚████╔╝ █████╗  ██║██╔██╗ ██║    ██████╔╝███████║ ╚████╔╝ ██║   ██║    ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║╚██╗██║  ╚██╔╝  ██╔══╝  ██║██║╚██╗██║    ██╔═══╝ ██╔══██║  ╚██╔╝  ██║   ██║    ██╔══██║██║   ██║██║╚██╗██║██║   ██║
██║ ╚████║   ██║   ███████╗██║██║ ╚████║    ██║     ██║  ██║   ██║   ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝   ╚═╝    ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
</span>
<span class="rd semibold">APIs used -</span>

* <a 
    href="https://docs.github.com/en/rest/about-the-rest-api"
    target="_blank"
    class="blu semibold">Github REST API</a>

* <a 
    href="https://pinned.berrysauce.me"
    target="_blank" 
    class="blu semibold">Pinned repos</a> - berrysauce/pinned

* <a 
    href="https://github.com/idealclover/GitHub-Star-Counter"
    target="_blank"
    class="blu semibold">Total stars and forks</a> - idealclover/GitHub-Star-Counter

`;

export const READ_JSON_ERROR: string =
  "<span class='rd semibold'>Error reading config.json</span>";

export const FETCH_GITHUB_ERROR: string =
  "<span class='rd semibold'>Error fetching data from Github.</span>";
