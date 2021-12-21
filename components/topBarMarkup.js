import {TopBar,ActionList} from '@shopify/polaris';




function topBarMarkup({storeName,userMenuActive,toggleMobileNavigationActive,toggleUserMenuActive,handleSearchFieldChange,searchValue,searchActive,handleSearchResultsDismiss
}) {

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );



    return (  <>

<TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
    
    
    </>);
}

export default topBarMarkup;