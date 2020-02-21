<template>
  <nav id="navbar-main" class="navbar is-fixed-top">
  <div class="navbar-brand">
    <a title="Expand" class="navbar-item is-desktop-icon-only is-hidden-touch">
      <span class="icon">
        <i class="mdi mdi-forwardburger mdi-24px"></i>
      </span>
    </a>
    <a class="navbar-item is-hidden-desktop"><span class="icon"><i class="mdi mdi-forwardburger mdi-24px"></i></span></a>
  </div>
  <div class="navbar-brand is-right">
    <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
      <span class="icon">
        <i class="mdi mdi-bell default"></i>
      </span>
    </a>
    <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
      <span class="icon"><i class="mdi mdi-dots-vertical default"></i></span>
    </a>
  </div>
  <div class="navbar-menu fadeIn animated faster">
    <div class="navbar-end">
      <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar">
        <a class="navbar-link is-arrowless">
          <div class="is-user-avatar">
            <img src="/data-sources/avatars/annie-spratt-121576-unsplash.jpg" alt="John Doe">
          </div>
          <div class="is-user-name"><span>John Doe</span></div>
          <span class="icon"><i class="mdi mdi-chevron-down default"></i></span>
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-account default"></i></span>
            <span>My Profile</span>
          </a>
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-settings default"></i></span>
            <span>Settings</span>
          </a>
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-email default"></i></span>
            <span>Messages</span>
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-logout default"></i></span>
            <span>Log Out</span>
          </a>
        </div>
      </div>
      <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider">
        <a class="navbar-link is-arrowless">
          <span class="icon"><i class="mdi mdi-menu default"></i></span>
          <span>Sample Menu</span>
          <span class="icon"><i class="mdi mdi-chevron-down default"></i></span>
        </a>
        <div class="navbar-dropdown">
          <a href="#/profile" class="navbar-item">
            <span class="icon"><i class="mdi mdi-account default"></i></span>
            <span>My Profile</span>
          </a>
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-settings default"></i></span>
            <span>Settings</span>
          </a>
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-email default"></i></span>
            <span>Messages</span>
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            <span class="icon"><i class="mdi mdi-logout default"></i></span>
            <span>Log Out</span>
          </a>
        </div>
      </div>
      <a href="https://justboil.me/bulma-admin-template/one" title="About" class="navbar-item has-divider is-desktop-icon-only">
        <span class="icon"><i class="mdi mdi-help-circle-outline default"></i></span>
        <span>About</span>
      </a>
      <a title="Updates" class="navbar-item has-divider is-desktop-icon-only">
        <span class="icon has-update-mark"><i class="mdi mdi-bell default"></i></span>
        <span>Updates</span>
      </a>
      <a title="Log out" class="navbar-item is-desktop-icon-only">
        <span class="icon"><i class="mdi mdi-logout default"></i></span>
        <span>Log out</span>
      </a>
    </div>
  </div>
</nav>
</template>
