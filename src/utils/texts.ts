export const HELP = `
<pre style="display: inline-block; margin: 0; line-height: 1.2;"><span class="ascii">███╗   ██╗██╗   ██╗███████╗██╗███╗   ██╗    ██████╗ ██╗  ██╗██╗   ██╗ ██████╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗
████╗  ██║╚██╗ ██╔╝██╔════╝██║████╗  ██║    ██╔══██╗██║  ██║╚██╗ ██╔╝██╔═══██╗    ██╔══██╗██║   ██║████╗  ██║██╔════╝
██╔██╗ ██║ ╚████╔╝ █████╗  ██║██╔██╗ ██║    ██████╔╝███████║ ╚████╔╝ ██║   ██║    ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║╚██╗██║  ╚██╔╝  ██╔══╝  ██║██║╚██╗██║    ██╔═══╝ ██╔══██║  ╚██╔╝  ██║   ██║    ██╔══██║██║   ██║██║╚██╗██║██║   ██║
██║ ╚████║   ██║   ███████╗██║██║ ╚████║    ██║     ██║  ██║   ██║   ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝   ╚═╝    ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝</span></pre>

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
Click <span class="grn semibold">+</span> to open a new tab. Each tab has its own history and working directory.
Visit my website: <a href="https://nyeinphyoaung.com" target="_blank" class="blu semibold">nyeinphyoaung.com</a>
`;

export const CREDITS: string = `
<pre style="display: inline-block; margin: 0; line-height: 1.2;"><span class="ascii">███╗   ██╗██╗   ██╗███████╗██╗███╗   ██╗    ██████╗ ██╗  ██╗██╗   ██╗ ██████╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗
████╗  ██║╚██╗ ██╔╝██╔════╝██║████╗  ██║    ██╔══██╗██║  ██║╚██╗ ██╔╝██╔═══██╗    ██╔══██╗██║   ██║████╗  ██║██╔════╝
██╔██╗ ██║ ╚████╔╝ █████╗  ██║██╔██╗ ██║    ██████╔╝███████║ ╚████╔╝ ██║   ██║    ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║╚██╗██║  ╚██╔╝  ██╔══╝  ██║██║╚██╗██║    ██╔═══╝ ██╔══██║  ╚██╔╝  ██║   ██║    ██╔══██║██║   ██║██║╚██╗██║██║   ██║
██║ ╚████║   ██║   ███████╗██║██║ ╚████║    ██║     ██║  ██║   ██║   ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝   ╚═╝    ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝</span></pre>
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

export const MAN_PAGES: Record<string, string> = {
  help: `<span class="ylw semibold">NAME</span>\n    help - display available commands\n\n<span class="ylw semibold">SYNOPSIS</span>\n    help\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Display the help section with a list of all available commands.`,
  about: `<span class="ylw semibold">NAME</span>\n    about - display profile information\n\n<span class="ylw semibold">SYNOPSIS</span>\n    about\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Show name, intro, tech stack, and education.`,
  experience: `<span class="ylw semibold">NAME</span>\n    experience - display work experience\n\n<span class="ylw semibold">SYNOPSIS</span>\n    experience\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Show work history with titles, companies, and descriptions.\n\n<span class="ylw semibold">ALIASES</span>\n    exp`,
  github: `<span class="ylw semibold">NAME</span>\n    github - display GitHub profile stats\n\n<span class="ylw semibold">SYNOPSIS</span>\n    github\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Fetch and display GitHub profile in neofetch style.\n\n<span class="ylw semibold">ALIASES</span>\n    neofetch, fastfetch`,
  repos: `<span class="ylw semibold">NAME</span>\n    repos - display pinned repositories\n\n<span class="ylw semibold">SYNOPSIS</span>\n    repos\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Show pinned GitHub repositories with stats.\n\n<span class="ylw semibold">ALIASES</span>\n    onefetch`,
  links: `<span class="ylw semibold">NAME</span>\n    links - display contact info\n\n<span class="ylw semibold">SYNOPSIS</span>\n    links\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Show GitHub, email, and LinkedIn links.`,
  cd: `<span class="ylw semibold">NAME</span>\n    cd - change directory\n\n<span class="ylw semibold">SYNOPSIS</span>\n    cd [directory]\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Change the current working directory. With no arguments, changes to ~.\n    Supports relative paths, .., and absolute paths starting with ~ or /.`,
  ls: `<span class="ylw semibold">NAME</span>\n    ls - list directory contents\n\n<span class="ylw semibold">SYNOPSIS</span>\n    ls [directory]\n\n<span class="ylw semibold">DESCRIPTION</span>\n    List files and directories. Directories are shown in blue with a trailing /.`,
  cat: `<span class="ylw semibold">NAME</span>\n    cat - display file contents\n\n<span class="ylw semibold">SYNOPSIS</span>\n    cat &lt;file&gt;\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Print the contents of a file to the terminal.`,
  pwd: `<span class="ylw semibold">NAME</span>\n    pwd - print working directory\n\n<span class="ylw semibold">SYNOPSIS</span>\n    pwd\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Print the full path of the current working directory.`,
  tree: `<span class="ylw semibold">NAME</span>\n    tree - display directory tree\n\n<span class="ylw semibold">SYNOPSIS</span>\n    tree [directory]\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Recursively display the directory structure in a tree format.`,
  clear: `<span class="ylw semibold">NAME</span>\n    clear - clear the terminal\n\n<span class="ylw semibold">SYNOPSIS</span>\n    clear\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Clear the terminal screen. Also available via Ctrl+L.`,
  history: `<span class="ylw semibold">NAME</span>\n    history - display command history\n\n<span class="ylw semibold">SYNOPSIS</span>\n    history\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Show the last 20 commands. Use arrow keys to navigate history.`,
  theme: `<span class="ylw semibold">NAME</span>\n    theme - manage terminal themes\n\n<span class="ylw semibold">SYNOPSIS</span>\n    theme\n    theme set &lt;name&gt;\n\n<span class="ylw semibold">DESCRIPTION</span>\n    View available themes or set a specific theme.\n\n<span class="ylw semibold">SEE ALSO</span>\n    wal - cycle through themes`,
  echo: `<span class="ylw semibold">NAME</span>\n    echo - display text\n\n<span class="ylw semibold">SYNOPSIS</span>\n    echo [text]\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Print the given text to the terminal.`,
  whoami: `<span class="ylw semibold">NAME</span>\n    whoami - display current user\n\n<span class="ylw semibold">SYNOPSIS</span>\n    whoami\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Print the current username.`,
  man: `<span class="ylw semibold">NAME</span>\n    man - display manual pages\n\n<span class="ylw semibold">SYNOPSIS</span>\n    man &lt;command&gt;\n\n<span class="ylw semibold">DESCRIPTION</span>\n    Display the manual page for a given command.`,
};

export const READ_JSON_ERROR: string =
  "<span class='rd semibold'>Error reading config.json</span>";

export const FETCH_GITHUB_ERROR: string =
  "<span class='rd semibold'>Error fetching data from Github.</span>";
