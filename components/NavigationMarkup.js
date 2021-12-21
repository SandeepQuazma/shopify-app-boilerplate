import {Navigation}from '@shopify/polaris';
import {ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor} from '@shopify/polaris-icons';



function NavigationMarkup({toggleIsLoading,toggleModalActive}) {
    return ( 

            <Navigation location="/">
              <Navigation.Section
                items={[
                  {
                    label: 'Back to Shopify',
                    icon: ArrowLeftMinor,
                  },
                ]}
              />
              <Navigation.Section
                separator
                title="Jaded Pixel App"
                items={[
                  {
                    label: 'Dashboard',
                    icon: HomeMajor,
                    onClick: toggleIsLoading,
                  },
                  {
                    label: 'Jaded Pixel Orders',
                    icon: OrdersMajor,
                    onClick: toggleIsLoading,
                  },
                ]}
                action={{
                  icon: ConversationMinor,
                  accessibilityLabel: 'Contact support',
                  onClick: toggleModalActive,
                }}
              />
            </Navigation>
          );
    
}

export default NavigationMarkup;