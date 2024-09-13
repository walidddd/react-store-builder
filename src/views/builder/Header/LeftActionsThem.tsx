import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ElIcone from '../../../utils/Ui/ElIcon';
import StatusLabel from '../../../utils/Ui/ElStatusLabel';
import ElSettingsOptions from '../../../utils/Ui/ElSettingsOptions';

const LeftActionsThem = () => {
  // ElSettingsOptions Component
  const optionsSettings = [
    {
      name: 'Edit code',
      href: '#',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'Edit default them content',
      href: '#',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'View',
      href: '#',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'View documentation',
      href: '#',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'Keyboard shortcuts',
      href: '#',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'Get Support',
      href: '#',
      icon: 'pi pi-user-edit',
    },
  ];
  const ElSettingsOptionsListStyle = {
    padding: '6px 12px',
  };
  const ElSettingsOptionsHeaderStyle = {
    padding: '18px 16px',
  };

  return (
    <>
      <div className="left-name-section">
        {/* Start Exit Button */}
        <button className="exit-button">
          <ElIcone icon={faArrowRightFromBracket}></ElIcone>
          <label>Exit</label>
        </button>

        {/* Start Title Them */}
        <h4 className="title-them">Nightmare Toys Live</h4>

        {/* Start label status template */}
        <div className="status-template mr-4 flex">
          <StatusLabel status="active"></StatusLabel>
        </div>
        <ElSettingsOptions
          options={optionsSettings}
          listStyle={ElSettingsOptionsListStyle}
          headerStyle={ElSettingsOptionsHeaderStyle}
        >
          {/* Header Setting */}
          <h2 className="text-md">Version no 0.0.1</h2>
          <p className="text-sm">Design and support by Clean Canvas</p>
        </ElSettingsOptions>
      </div>
    </>
  );
};

export default LeftActionsThem;
