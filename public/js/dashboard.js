const menus = document.querySelectorAll('.menuOpen');
const closeMenus = document.querySelectorAll('.menuClose');
const dashboards = document.querySelectorAll('.dashContainer');

menus.forEach(menu => {
  menu.addEventListener('click', () => {
    menu.classList.add('hidden');

    closeMenus.forEach(closeMenu => {
      closeMenu.classList.remove('hidden');
    })

    dashboards.forEach(dashboard => {
      dashboard.classList.toggle('active');
    });
  });
});

closeMenus.forEach(closeMenu => {
  closeMenu.addEventListener('click', () => {
    closeMenu.classList.add('hidden');

    menus.forEach(menu => {
      menu.classList.remove('hidden');
    })

    dashboards.forEach(dashboard => {
      dashboard.classList.toggle('active');
    });
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.pageLinks button');
  const containers = document.querySelectorAll('.dashMain .container');
  const currentPage = document.querySelector('.currentPage');
  const dashboardContainer = document.querySelector('.dashContainer');

  // Detect which dashboard is active: admin, user, or business
  let dashboardType = '';

  if (dashboardContainer.classList.contains('adminDash')) {
    dashboardType = 'admin';
  } 
  else if (dashboardContainer.classList.contains('userDash')) {
    dashboardType = 'user';
  } 
  else if (dashboardContainer.classList.contains('bizDash')) {
    dashboardType = 'business';
  }

  const pageTitles = {
    admin: {
      home: 'Dashboard',
      donate: 'Donate',
      tips: 'Resources/Tips',
      notifications: 'Notifications',
      support: 'Support',
      leaderboard: 'Leaderboard',
      profile: 'Profile',
      logout: 'Logout'
    },
    user: {
      home: 'Dashboard',
      tips: 'Resources/Tips',
      notifications: 'Notifications',
      support: 'Support',
      leaderboard: 'Leaderboard',
      profile: 'Profile',
      logout: 'Logout'
    },
    business: {
      home: 'Dashboard',
      donate: 'Donations',
      tips: 'Resources',
      notifications: 'Notifications',
      support: 'Support',
      leaderboard: 'Leaderboard',
      profile: 'Profile',
      logout: 'Logout'
    }
  };

  function switchContainer(targetId) {
    containers.forEach(container => {
      container.classList.add('hidden');
    });

    const activeContainer = document.querySelector(`.container.${targetId}`);
    if (activeContainer) {
      activeContainer.classList.remove('hidden'); 
    }

    currentPage.textContent = pageTitles[dashboardType][targetId];
  }

  switchContainer('home');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      switchContainer(target);
    });
  });
});

//...................
