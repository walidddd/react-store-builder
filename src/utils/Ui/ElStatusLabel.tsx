interface StatusLabelProps {
  status: 'active' | 'inactive';
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  let statusText = '';
  let statusColor = '';
  let textColor = '';

  switch (status) {
    case 'active':
      statusText = 'Active';
      statusColor = 'bg-green-300';
      textColor = 'text-green-700';
      break;
    case 'inactive':
      statusText = 'Inactive';
      statusColor = 'bg-red-500';
      textColor = 'text-red-600';
      break;
    default:
      break;
  }

  return (
    <div
      className={`inline-block rounded-xl   px-2 text-white text-sm font-semibold ${statusColor} ${textColor} `}
    >
      {statusText}
    </div>
  );
};

export default StatusLabel;
